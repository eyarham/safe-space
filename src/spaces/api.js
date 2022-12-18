import api from "../_common/api";
const { createDoc, getDocsSub } = api("spaces");


const create = async (data) => {
  const newSpace = {
    ...data
  };
  await createDoc(newSpace);
}
export { create, getDocsSub };

