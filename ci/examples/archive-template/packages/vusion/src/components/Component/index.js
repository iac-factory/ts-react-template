/***
 *
 * @param type
 *
 * @param callback
 *
 */

export default function toggle(type, callback = () => {}) {
    const { isActive } = this.state;

    Object.keys(this.state.isActive).forEach((state) => {
        isActive[state] = state === type ? !this.state.isActive[type] : false;
    });

    this.setState({ isActive }, () => callback(this.state.isActive));
}
