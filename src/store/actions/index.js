import axios from "axios";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const NOTLARI_AL = "NOTLARI_AL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}
export function notlariAl(notlar) {
  return { type: NOTLARI_AL, payload: notlar };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://nextgen-project.onrender.com/api/s10d5/gratitudes", yeniNot)
    .then((res) => {
      // res.data objesi içerisinden ihtiyaç duyduğun değeri bul ve oluşturduğun notEkle ile dispatch et (status codea dikkat)
      console.log("notekle1:", res.data.body, "yenidata1:", yeniNot);
      console.log("status:", res.status);
      if (res.status === 201) {
        dispatch(notEkle(res.data));
        console.log("notekle:", res.data, "yenidata:", yeniNot);
      }
    })
    .catch((error) => console.log(error));
};

export const notlariAlAPI = () => (dispatch) => {
  axios
    .get("https://nextgen-project.onrender.com/api/s10d5/gratitudes")
    .then((res) => {
      if (res.status === 200) {
        dispatch(notlariAl(res.data));
      }
    })
    .catch((error) => console.log(error));
};

// notSilAPI buraya
