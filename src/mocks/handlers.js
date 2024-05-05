import { http, HttpResponse } from 'msw';

let posts = [
  {
    body: 'Bugün hava çok güzel <3|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!',
    created_at: 'Fri May 26 2023 09:40:27 GMT+0300 (GMT+03:00)',
    id: 1,
  },
];

export const handlers = [
  http.get(
    'https://nextgen-project.onrender.com/api/s10d5/gratitudes',
    ({ request }) => {
      return HttpResponse.json(posts);
    }
  ),
  http.delete(
    'https://nextgen-project.onrender.com/api/s10d5/gratitudes/:id',
    ({ request, params }) => {
      if (params.id == 1) {
        return HttpResponse.json(
          { message: 'Bu mesajı silme izniniz yok..' },
          { status: 403 }
        );
      }
      posts.splice(
        posts.findIndex((item) => item.id == params.id),
        1
      );
      return HttpResponse.json(posts);
    }
  ),
  http.post(
    'https://nextgen-project.onrender.com/api/s10d5/gratitudes',
    async ({ request }) => {
      const info = await request.json();
      const newItem = {
        body: [info.g1, info.g2, info.g3].join('|'),
        created_at: 'Fri May 26 2023 09:40:27 GMT+0300 (GMT+03:00)',
        id: Math.floor(Math.random() * 1000000),
      };
      posts.push(newItem);
      return HttpResponse.json(newItem, { status: 201 });
    }
  ),
];
