import { faker } from "@faker-js/faker";

export module User {
    export function seed(entropy: number) {
        faker.seed(entropy);
    }

    export function create(): Type {
        const password = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{16,}$");

        return {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(16, true, password),
            login: {
                date: faker.date.past(),
                expiration: faker.date.future(),
                origin: faker.internet.ip()
            },
            role: faker.datatype.number(10),
            creation: faker.datatype.datetime(),
            modification: faker.datatype.datetime(),
            name: faker.name.firstName()
        };
    }

    export function generate(total?: number, entropy?: number): Type[] {
        User.seed(entropy ?? 100);

        const container = [];

        void Array.from( { length: total ?? 10 } ).forEach( () => {
            container.push( User.create() );
        } );

        return container;
    }

    export interface Type {
        id: string;
        email: string;
        username: string;
        password: string;
        login: {
            date: Date,
            expiration: Date,
            origin: string
        };
        role: number;

        creation: Date;
        modification: Date;

        name: string;
    }
}

export default User;