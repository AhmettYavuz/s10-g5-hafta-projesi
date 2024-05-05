import axios from 'axios';

export const NOT_EKLE = 'NOT_EKLE';
export const NOT_SIL = 'NOT_SIL';
export const NOTLARI_AL = 'NOTLARI_AL';

export function notEkle(not) {
  // ...
}

export function notSil(notId) {
  // ...
}

export function notlariAl(notlar) {
  return { type: NOTLARI_AL, payload: notlar };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post('https://nextgen-project.onrender.com/api/s10d5/gratitudes', yeniNot)
    .then((res) => {
      // res.data objesi içerisinden ihtiyaç duyduğun değeri bul ve oluşturduğun notEkle ile dispatch et (status codea dikkat)
    })
    .catch((error) => console.log(error));
};

export const notlariAlAPI = () => (dispatch) => {
  axios
    .get('https://nextgen-project.onrender.com/api/s10d5/gratitudes')
    .then((res) => {
      if (res.status === 200) {
        // response olarak gelen datayı notlariAl ile dispatch et.
      }
    })
    .catch((error) => console.log(error));
};

// notSilAPI buraya
