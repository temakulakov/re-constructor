// import { stringify } from 'qs';

// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_ENDPOINT}api/v1/template?${stringify({
//       published: false,
//       limit: 100,
//       offset: 0,
//     })}`,
//     {
//       headers: { Authorization: `Basic ${btoa('user-adm:9VBQ64kj')}` },
//     }
//   );

//   const templates: {
//     id: string;
//     createdAt: string;
//     description: string;
//     name: string;
//     type: string;
//     data: NodeTree;
//   }[] = await res.json();

//   console.log({ templates });

//   return [{ slug: [] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }];
// }

export default function PreviewPage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log({ params });

  return <>123</>;
}
