import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    subCategory: 'Topwear',
    bestseller: false,
    sizes: [],
  });

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleSize = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((item) => item !== size)
        : [...prevData.sizes, size],
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'sizes') {
          form.append(key, JSON.stringify(formData[key]));
        } else {
          form.append(key, formData[key]);
        }
      });

      images.forEach((image, index) => {
        if (image) form.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, form, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Men',
          subCategory: 'Topwear',
          bestseller: false,
          sizes: [],
        });
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {[...Array(4)].map((_, index) => (
            <label htmlFor={`image${index + 1}`} key={index}>
              <img
                className='w-20'
                src={images[index] ? URL.createObjectURL(images[index]) : assets.upload_area}
                alt={`upload ${index + 1}`}
              />
              <input
                type='file'
                id={`image${index + 1}`}
                hidden
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select
            name='category'
            onChange={handleInputChange}
            value={formData.category}
            className='w-full px-3 py-2'
          >
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select
            name='subCategory'
            onChange={handleInputChange}
            value={formData.subCategory}
            className='w-full px-3 py-2'
          >
            <option value='Topwear'>Top</option>
            <option value='Bottomwear'>Skirt/Dress</option>
            <option value='Winterwear'>Pants</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            name='price'
            value={formData.price}
            onChange={handleInputChange}
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='25'
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p
                className={`${
                  formData.sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          type='checkbox'
          id='bestseller'
          checked={formData.bestseller}
          onChange={() =>
            setFormData((prevData) => ({
              ...prevData,
              bestseller: !prevData.bestseller,
            }))
          }
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to High Tea Collections
        </label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>
        ADD
      </button>
    </form>
  );
};

export default Add;
