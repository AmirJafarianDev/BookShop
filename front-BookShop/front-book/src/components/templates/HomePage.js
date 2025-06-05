import Link from "next/link";
import Card from "../module/Card";

async function HomePage() {
  let someData = [];
  try {
    const response = await fetch(`http://localhost:3000/book`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const { data } = await response.json();
    // console.log(data);
    const newData = data.slice(-4).reverse();
    someData.push(newData);
    // console.log(someData[0]);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <h1 className="flex w-fit bg-blue-500 text-white  mt-7 rounded-2xl h-16 m-auto text-4xl">
        وبسایت کتابفروشی
      </h1>
      <h3 className="text-2xl font-bold mr-[10%] mt-10">جدید ترین محصولات :</h3>
      <div className="w[80%] mr-[10%] flex flex-wrap items-center justify-center md:ml-[5%] ">
        {someData[0].map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Link href={"/All-Book"}>
        <div className="flex justify-center items-center mt-8 mb-10">
          <button className="bg-blue-500 text-white cursor-pointer w-fit p-8 h-6 rounded-2xl flex items-center justify-center hover:bg-blue-950 hover:shadow-blue-400 transition-all">
            مشاهده تمامی محصولات
          </button>
        </div>
      </Link>
    </div>
  );
}

export default HomePage;
