import api from "../_common/api";
const { createDoc, getDocsSub, getByIdSub, updateDoc, updateField } = api("spaces");


const create = async (data) => {
  const newSpace = {
    ...data
  };
  await createDoc(newSpace);
}


const getApprovedDocsSub = (callback) => {
  return getDocsSub(docs => {
    const approvedDocs = docs.filter(d => d.data().isApproved === true);

    return callback(approvedDocs);
  })
}

const setIsApproved = async (id, isApproved) => {
  await updateField(id, { isApproved });
}
const setIsReviewed = async (id, isReviewed) => {
  await updateField(id, { isReviewed });
}

const updateSpaceRating = async (id, rating)=>{
  return await  updateField(id, {rating});
}

const hasUnreviewedSub = (callback) => {
  return getDocsSub(docs => {
    const unreviewedDocs = docs.filter(d => d.data().isReviewed !== true);
    const hasUnreviewed = unreviewedDocs.length > 0;
    return callback(hasUnreviewed);
  })
}

const getRatingData = rating => {
  if (0 < rating && rating < 1)
    return { text: "Hostile", icon: "red" }
  if (1 <= rating && rating < 2)
  return { text: "Caution", icon: "orange" }
  if (2 <= rating && rating < 3)
  return { text: "LGB Friendly", icon: "yellow" }
  if (3 <= rating && rating < 4)
  return { text: "LGBT+ Friendly", icon: "green" }
  if (4 <= rating )
  return { text: "LGBT+ Safe Space", icon: "blue" }

  return { text: "?", icon: "black" }
}

export { create, getDocsSub, getApprovedDocsSub, getByIdSub, updateDoc, setIsApproved, setIsReviewed, hasUnreviewedSub,updateSpaceRating,getRatingData };

