// app/zukan-dbtest/page.tsx
"use client";
import useSWR from "swr";

type Pet = {
  id: number;
  species: string;
  name: string;
  role: string;
  comment: string;
  emoji?: string | null;
  createdAt: string;
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ZukanDbTest() {
  const { data, error, isLoading, mutate } = useSWR<Pet[]>("/api/pets", fetcher);

  async function addSample() {
    await fetch("/api/pets", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        species: "猫",
        name: "ミケ",
        role: "おやつ警備員",
        comment: "袋の音は1秒で検知",
        emoji: "🐱"
      })
    });
    mutate();
  }

  if (error) return <div>読み込みエラー</div>;
  if (isLoading) return <div>読み込み中…</div>;

  return (
    <main style={{maxWidth:900, margin:"40px auto", fontFamily:"system-ui"}}>
      <h1>図鑑（DBテスト用・既存UI非破壊）</h1>
      <button onClick={addSample}>サンプル追加</button>
      <ul>
        {data?.map(p => (
          <li key={p.id}>
            <strong>{p.emoji ?? ""} {p.species}・{p.name}</strong>
            <div>役割：{p.role}</div>
            <div>コメント：{p.comment}</div>
            <small>{new Date(p.createdAt).toLocaleString("ja-JP")}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
