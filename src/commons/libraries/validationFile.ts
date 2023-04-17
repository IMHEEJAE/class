export const checkValidationFile = (file?: File) => {
  if (!file?.size) {
    alert("파일이 없습니다.");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert("파일 용량이 너무 큼. (제한 : 5MB)");
    return false;
  }
  if (!file.type.includes("jpeg" && "png")) {
    alert("jpeg 파일 또는 png파일만 업로드 가능함");
    return false;
  }
  return true;
};
