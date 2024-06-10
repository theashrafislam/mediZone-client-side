import { useQuery } from "@tanstack/react-query";
import useAxoisPublic from "../../Hooks/useAxoisPublic";
import { Link } from "react-router-dom";

const CategoryCardSection = () => {

    const axoisPublic = useAxoisPublic();

    const { data: categorys = [] } = useQuery({
        queryKey: ['categorys'],
        queryFn: async () => {
            const res = await axoisPublic.get('/categorys')
            return res.data;
        }
    });
    // console.log(categorys);

    return (
        <div className="m-12">
            <div className="w-11/12 md:w-5/6 m-auto text-center space-y-2">
                <h2 className="text-2xl font-semibold">Explore Our Medicine Categories</h2>
                <p>Discover the wide range of medications available to meet your health needs. From pain relief to managing chronic conditions, our comprehensive categories provide the information you need to choose the right medicine.</p>
            </div>
            <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                {
                    categorys.map(category =>
                        <Link to={`/category-details/${category.categoryName}`} key={category._id} className="text-center border-2 p-3 rounded-xl">
                            <img className="w-52 h-32 rounded-full" src={category.categoryImage} alt="" />
                            <h1 className="text-xl font-medium">{category.categoryName}</h1>
                            <p className="text-xl font-bold">{category.numberOfCategory}</p>
                        </Link>
                        )
                }
            </div>
        </div>
    );
};

export default CategoryCardSection;