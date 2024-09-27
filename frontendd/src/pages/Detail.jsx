import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMenuItems } from '../data/menu';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/cart';

const Detail = () => {
    const { slug } = useParams();
    const [detail, setDetail] = useState(null); // Initialize as null
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMenuDetail = async () => {
            try {
                const menuItems = await fetchMenuItems(); // Fetch the menu items
                const findDetail = menuItems.find(menu => menu.slug === slug); // Use find instead of filter

                if (findDetail) {
                    setDetail(findDetail); // Set the detail based on the fetched data
                } else {
                    window.location.href = '/'; // Redirect if no item is found
                }
            } catch (error) {
                console.error("Failed to fetch menu items:", error);
                window.location.href = '/'; // Redirect on error
            }
        };

        getMenuDetail(); // Fetch details when the component mounts or slug changes
    }, [slug]);

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    };

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (detail) {
            dispatch(addToCart({
                menuId: detail.idMenu,
                quantity: quantity,
                price : detail.price
            }));
        }
    };

    // Show loading state while fetching details
    if (!detail) return <div>Loading...</div>;

    return (
        <div>
            <h2 className='text-3xl'>DETAIL</h2>
            <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                    <img src={detail.image} alt="" className='w-full' />
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl uppercase font-bold'>{detail.menuName}</h1>
                    <p className='font-bold text-3xl'>
                        Rp. {detail.price}
                    </p>
                    <div className='flex gap-5'>
                        <div className='flex gap-2 justify-center items-center'>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
                            <span className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>
                        </div>
                        <button className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl' onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aut vel quaerat rem id cum necessitatibus eveniet soluta, voluptatibus, sint corporis fuga dignissimos inventore assumenda obcaecati illum vitae quasi asperiores.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
