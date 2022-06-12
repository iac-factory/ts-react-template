import Forage from "localforage";

export const Index = Forage.createInstance({
    name: Forage.INDEXEDDB,
    storeName: "IaC-Factory.Index-DB",
    description: "Index-DB Browser Storage for IaC-Factory"
});

export default Index;