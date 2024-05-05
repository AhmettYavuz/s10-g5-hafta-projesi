# Gün Projesi: Şükran Günlüğü

Bu hafta yoğun geçti ama neyse ki hafta sonu geliyor. Gene de üzerindeki negatif yükü atamadın. Şirketteki bir senior developer son zamanlarda kullanıdığı bir yöntemden bahsetti. Şükran günlüğü tutmak, yoğun temposunda onu psikolojik olarak çok motive etmiş.

Sen de bu yöntemi denemek istedin, hemen araştırmaya başladın ama düşündüğünden çok pahalı geldi. Onun yerine "uygulamasını yaparım daha iyi" dedin.

UI tarafı ve backend tarafı tamamlandı. Reduxı ekleyerek projeyi kullanmaya başlamak istiyorsun.

Yapmayı planladığın adımlar:

- [ ] `store/reducers/index.js`de reducerını tanımla.
- [ ] state başlangıç değerini `baslangicNotlariniGetir fonksiyonu`nu kullanarak oluştur.
- [ ] reducerda şimdilik sadece default casei olsun.
- [ ] `store/store.js`de redux storeu bu reducer ile create et
- [ ] storea redux-thunkı middleware olarak ekle
- [ ] `main.jsx`de oluşturduğun storeu redux Providerınıa ekleyerek uygulamanı Provider ile sarmala.

- [ ] `store/actions/index.js` dosyasında notlariAlAPI thunk fonksiyonunda başarılı axios isteği için doğru action creatorı dispatch et.
- [ ] reducerında NOTLARI_AL için bir case yarat.
- [ ] localStoraragea yazmayı unutma. (Hazır `localStorageStateYaz fonskiyonunu` kullan)
- [ ] `PostList.jsx` componentinde notları redux storedan al.
- [ ] useEffect ile componentDidMount eventinde notlariAlAPIyi dispatch et.

- [ ] `notEkle` action creatorını oluştur.
- [ ] `notEkleAPI` thunk fonksiyonunda başarılı axios isteği için doğru action creatorı dispatch et. (`status code 201` olmalı)
- [ ] reducerda NOT_EKLE case'ini oluştur. (localStorageı güncellemeyi unutma)
- [ ] `PostForm.jsx` componentinde hazırladığın actionı dispatch et.
- [ ] dispatch sonrasında Tüm Notlar sayfasına yönlendir.

- [ ] `notSil` action creatorını oluştur.
- [ ] `notSilAPI` thunk fonksiyonu noEkleAPIye bakarak oluştur.
- [ ] status code 200 olmalı
- [ ] https://nextgen-project.onrender.com/api/s10d5/gratitudes/${id} adresine `delete` isteği atmalı
- [ ] reducerda NOT_SIL case'ini oluştur. (localStorageı güncellemeyi unutma)
- [ ] `Post.jsx` componentinde hazırladığın actionı dispatch et.

- [ ] ToastContainer componentini App.jsxe ekle
- [ ] not eklendiğinde toast ile `Notun başarıyla kaydedildi. Güzelliklerle dolu bir gün dileğiyle...` mesajını göster. (2sn kalsın)
- [ ] not silindiğinde toast ile `Notunuz silindi...` mesajını göster.
- [ ] silmede hata oluşursa (axios error) ekrana toast warning olarak `Bir hata oluştu!` mesajını göster.
