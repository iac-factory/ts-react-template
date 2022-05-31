/***
 * Simulate a long-running HTTP callable
 * ---
 *
 * @param {number} duration
 * @param content {string} Optional body to return back
 * @returns {Promise<boolean | string>}
 * @constructor
 */
const Awaitable = async ( duration: number, content?: string ): Promise<boolean | string> => {
    return new Promise( async ( resolve ) => {
        await setTimeout( () => {
            resolve( ( content ) ? JSON.stringify( JSON.parse( content ), null, 4 ) : true );
        }, duration );
    } );
};

export { Awaitable };
export default Awaitable;
