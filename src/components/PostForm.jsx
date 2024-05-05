import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { notEkleAPI } from "../store/actions";
import { da } from "date-fns/locale";

const Gratitude = "https://i.ibb.co/QN0cLh0/grForm.png";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const history = useHistory();
  const dispatch = useDispatch();

  function onSubmit(data) {
    if (!isValid) return;
    dispatch(notEkleAPI(data));
    history.push("/notlar");
    // burada ilgili actionı dispatch et
    // tüm notlar sayfasına yönlendirin
  }

  const inputCx = "border border-zinc-300 h-9 rounded-none text-sm px-2 w-full";

  return (
    <div className="flex flex-col sm:flex-row beyazKutu">
      <div className="flex-1">
        <img src={Gratitude} alt="" className="block object-cover h-full" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-8 flex-1"
      >
        <h1>Minnettar hissediyorum, çünkü...</h1>
        <p className="text-xs">
          Şükran günlüğü notları; her gün teşekkür edilen birkaç şeyi
          listelemekten, minnettar olunan şeylere dair daha uzun ve kapsamlı
          yansıtmalara kadar pek çok şeyden oluşabilir.
        </p>
        <p className="text-stone-700 my-3 text-xs">
          Her gün belli saatlerde 3 maddeden oluşan bir liste yapmak, bu
          alışkanlık için iyi bir başlangıç noktası sayılır.
        </p>
        <div>
          <input
            className={inputCx}
            data-testid="input1"
            placeholder="Dışarıda tam en sevdiğim hava var"
            {...register("g1", { required: "Bu alan zorunludur" })}
          />
          {errors.g1 && (
            <p className="text-sm text-rose-700 py-1">{errors.g1.message}</p>
          )}
        </div>
        <div>
          <input
            className={inputCx}
            data-testid="input2"
            placeholder="Kedim beni bu sabah çok erken uyandırmadı :D"
            {...register("g2", { required: "Bu alan zorunludur" })}
          />
          {errors.g2 && (
            <p className="text-sm text-rose-700 py-1">{errors.g2.message}</p>
          )}
        </div>
        <div>
          <input
            className={inputCx}
            data-testid="input3"
            placeholder="Sevdiğim kurabiyeleri satan dükkan bugün açık"
            {...register("g3", { required: "Bu alan zorunludur" })}
          />
          {errors.g3 && (
            <p className="text-sm text-rose-700 py-1">{errors.g3.message}</p>
          )}
        </div>

        <button type="submit" className="myButton">
          Ekle
        </button>
      </form>
    </div>
  );
}
