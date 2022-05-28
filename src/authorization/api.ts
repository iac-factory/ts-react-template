export { Navigate } from "react-router-dom";
export { useLocation } from "react-router-dom";
export { useNavigate } from "react-router-dom";

export type { Navigator } from "react-router-dom";

export const API = {
    authorize: false,
    login( username: string, callback: () => void ) {
        API.authorize = true;
        void callback();
    },
    logout( callback: () => void ) {
        API.authorize = false;

        setTimeout( callback, 1000 * 10000 );
    }
};

export default API;