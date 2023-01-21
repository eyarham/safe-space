import api from "../_common/api";
const { createDoc, createAnonDoc, getDocsSub, updateField } = api("reviews");


const setIsApproved = async (id, isApproved) => {
  await updateField(id, { isApproved });
}

export { createDoc, createAnonDoc, getDocsSub, setIsApproved };

