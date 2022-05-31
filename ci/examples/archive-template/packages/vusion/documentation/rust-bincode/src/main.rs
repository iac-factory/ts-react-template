use serde::{Serialize, Deserialize};
use bincode;
use serde_pickle;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::str;

extern crate base64;

use base64::{encode, decode};

extern crate crypto;
extern crate rand;
// extern crate rustc_serialize;

use crypto::aes::{self, KeySize};
use crypto::digest::Digest;
use crypto::hmac::Hmac;
use crypto::mac::Mac;
use crypto::sha2::Sha256;
use crypto::symmetriccipher::SynchronousStreamCipher;

use std::iter::repeat;

use openssl::rsa::{Rsa, Padding};

#[derive(Serialize, Deserialize, Debug)]
struct Point {
    x: f32,
    y: f32,
}

#[derive(Serialize, Deserialize, Debug)]
struct Line {
    points: Vec<Point>,
    valid: bool,
    length: f32,
    desc: Vec<u8>,
}

use std::collections::BTreeMap;

// fn main() -> std::io::Result<()> {
//     //
//     // let x: f32 = 3.14;
//     // let xs = bincode::serialize(&x).unwrap();
//     // println!("f32 number {} serializes into byte array {:?}", x, xs);
//     //
//     // let x: Vec<u8> = vec![1, 2, 3];
//     // let xs = bincode::serialize(&x).unwrap();
//     // println!("Vec<u8> {:?} serializes into byte array {:?}", x, xs);
//     // let xd: Vec<u8> = bincode::deserialize(&xs).unwrap();
//     // assert_eq!(x, xd);
//     //
//     // let x: Vec<f32> = vec![3.141, 2.718, 1.618];
//     // let xs = bincode::serialize(&x).unwrap();
//     // println!("Vec<f32> {:?} serializes into byte array {:?}", x, xs);
//     // let xd: Vec<f32> = bincode::deserialize(&xs).unwrap();
//     // assert_eq!(x, xd);
//     //
//     // let x: (i32, &str, f32, bool) = (1, "hello", 4.5, true);
//     // let xs = bincode::serialize(&x).unwrap();
//     // println!("tuple {:?} serializes into byte array {:?}", x, xs);
//     // let xd: (i32, &str, f32, bool) = bincode::deserialize(&xs).unwrap();
//     // assert_eq!(x, xd);
//     //
//     // let x = ((1u8, 2u16), (3.141f32, 'a'), true);
//     // let xs = bincode::serialize(&x).unwrap();
//     // println!("nested tuple {:?} serializes into byte array {:?}", x, xs);
//     //
//     let point1: Point = Point { x: 1.0, y: 2.0 };
//     let point2: Point = Point { x: 3.0, y: 4.0 };
//     let point1s = bincode::serialize(&point1).unwrap();
//     let point2s = bincode::serialize(&point2).unwrap();
//     println!("struct Point serializes into byte array {:?}", point1s);
//     println!("struct Point serializes into byte array {:?}", point2s);
//     //
//     let length = ((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y)).sqrt();
//     let valid = if length == 0.0 { false } else { true };
//     let line = Line { points: vec![point1, point2], valid, length, desc: "a thin line".as_bytes().to_vec() };
//     let lines = bincode::serialize(&line).unwrap();
//     println!("struct Line serializes into byte array {:?}", lines);
//
//     let mut file = File::create("test")?;
//     file.write_all(&lines);
//
//     {
//         let mut file = File::open("test")?;
//         // read the same file back into a Vec of bytes
//         let mut buffer = Vec::<u8>::new();
//         file.read_to_end(&mut buffer)?;
//         println!("{:?}", buffer);
//     }
//
//     let lined: Line = bincode::deserialize(&lines).unwrap();
//
//     println!("{:?}", &lined);
//
//     assert_eq!(lined.desc, "a thin line");
//     assert_eq!(lined.points[1].x, 3.0);
//
//     Ok(())
// }
//
//

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct ENV {
    key: String,
    value: Vec<u8>,
    version: i64,
}

use crypto::curve25519::{curve25519_base, curve25519};
use crypto::chacha20poly1305::ChaCha20Poly1305;
use crypto::aead::{AeadEncryptor, AeadDecryptor};

fn main() -> std::io::Result<()> {
    let key = "hello world";
    let value = "test";

    // let mut sha = Sha256::new();
    // sha.input_str(value);
    // println!("{}", sha.result_str());

    let passphrase = "rust_by_example";

    let public_key_pem = "-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDC+Jx89MjzbWw9PPh0dffD+i2c
J7XMioLndImQvQiNJjZ00zyxjgt4+wkual+ZHhH94HIjRIeLI+ncBEjFMa1xIzHT
exz/pvJUCsHNxNK9958zR0E997xxSf3C2Lu8BWtJG348xd5QNzb+R+i963PtcAsQ
fCu+q5gbqqtQEIjlMwIDAQAB
-----END PUBLIC KEY-----";

    let private_key_pem = "-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,43371B6CECDB096AC2A362FD33BF4B07

aIs3x9UBN95VJJFsd1ddYxmwAKQdFE5BJwZVYtidV+cZ4Qpmg9tdBLm8AhF5bVGR
FzAVMxTEFQgwT4o2jH2UxRkRmChwNy6aqdGteDIK6yXQK7//GMmxhbvqMmFzwdof
2E7Jkq3BQQEqMFu2CxRUPUFYRIebEIZSDCD3PoJ6p7a77qwm/KCXCbad/DqtOGkJ
wOkPH5AXLIu02MJfs+vcLswXFMlq7aaUrAv5WGt1SpKz9Co6bplSYDG7JE+906Uw
MIg4XDJTJDKCKyDaPkMydw6StvyNuZfIYUNIofulLci7yoNEGvwQHsHCaHr6n4bt
I4iC9CbkEcPbf06HAWGFfsexeLGf9mU0HVsZi83QdMhWMbOREakFU755AMvTeB8w
IMCNn55nzJlSHooKuvJAmbqBBb4+wqgwnoYQEVZmTDZxqT/eR08Zl9d1QeKB+1fw
gjZmY/10kFLnTKlWGIaLIu60ehbXxZeFbW+m1pF9uHEiIkWgkrHNjKfzWh5EyfhY
vXxWuZH92ZP/nioGzVQr00oSEPLwW1RSoAx3jPuu1EILNu7lFL896CsDZpa1Oigf
OMxk0GhMuKs4H6TlHmx5a0TOAcGYWEbnqXi+KUw7pMPFiEs1/2crFI6QfQx8R7dL
/ohKFvksPExsB196RZ1PFyMdryOr/mCqI4nBT+KzPz4zJF2iTMGq3NFQI2MvW/4g
WMwsyQtIJQviFJpYlQpOVBFaeB69oHJMxfauM8OdEU8yomFl3sAVagNxPfiWsGt4
LRsReK2BDT/pnhhZG96qSsNPwQlrwffBleTy9BGSuHHox6A7GKyVAAOMND/TY1ak
-----END RSA PRIVATE KEY-----";

    // let data = "A quick brown fox jumps over the lazy dog.";

    // Encrypt with public key
    let rsa = Rsa::public_key_from_pem(public_key_pem.as_bytes()).unwrap();
    let mut encrypted_buffer: Vec<u8> = vec![0; rsa.size() as usize];
    let _ = rsa.public_encrypt(value.as_bytes(), &mut encrypted_buffer, Padding::PKCS1).unwrap();
    println!("Encrypted: {:?}", encrypted_buffer);


    let data = encrypted_buffer;

    // Decrypt with private key
    let rsa = Rsa::private_key_from_pem_passphrase(private_key_pem.as_bytes(), passphrase.as_bytes()).unwrap();
    let mut decrypted_buffer: Vec<u8> = vec![0; rsa.size() as usize];
    let _ = rsa.private_decrypt(&data, &mut decrypted_buffer, Padding::PKCS1).unwrap(); // length
    println!("Decrypted: {}", String::from_utf8(decrypted_buffer).unwrap());


    let mut map = ENV { key: (*key).to_string(), value: data, version: 1 };

    // Serialize the map into a pickle stream.
    // The second argument are serialization options.
    let serialized = serde_pickle::to_vec(&map, Default::default()).unwrap();
    let bin_serialized = bincode::serialize(&map).unwrap();


    // Deserialize the pickle stream back into a map.
    // Because we compare it to the original `map` below, Rust infers
    // the type of `deserialized` and lets serde work its magic.
    // The second argument are additional deserialization options.
    let deserialized = serde_pickle::from_slice(&serialized, Default::default()).unwrap();
    let bin_de: ENV = bincode::deserialize(&bin_serialized).unwrap();

    println!("{:#?}", deserialized);
    println!("Key {:#?}", bin_de.key);
    println!("Value {:#?}", bin_de.value);

    assert_eq!(map, deserialized);

    let mut file = File::create("test")?;

    file.write_all(&bin_serialized);

    {
        let mut file = File::open("test")?;
        // read the same file back into a Vec of bytes
        let mut buffer = Vec::<u8>::new();
        file.read_to_end(&mut buffer)?;

        let f_bin_de: ENV = bincode::deserialize(&buffer).unwrap();

        println!("{:?}", f_bin_de);

        // Decrypt with private key
        let rsa = Rsa::private_key_from_pem_passphrase(private_key_pem.as_bytes(), passphrase.as_bytes()).unwrap();
        let mut decrypted_buffer: Vec<u8> = vec![0; rsa.size() as usize];
        let _ = rsa.private_decrypt(&f_bin_de.value, &mut decrypted_buffer, Padding::PKCS1).unwrap(); // length
        // println!("Decrypted: {}", String::from_utf8(decrypted_buffer).unwrap());

        println!("Value: {}", String::from_utf8(decrypted_buffer).unwrap());
    }

    Ok(())
}
