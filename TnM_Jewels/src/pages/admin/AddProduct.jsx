import { useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
export default function AddProduct() {
    const [slugAvailable, setSlugAvailable] = useState(null);
    const [uploading, setUploading] = useState(false);
const [formData,setFormData]=useState({

    name:"",

    slug:"",

    category:"",

    price:"",

    originalPrice:"",

    stock:"",

    badge:"",

    description:"",

    bestSeller:false,

    newArrival:true,

    images: [],

});
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
const checkSlugAvailability = async (slug) => {
  if (!slug) {
    setSlugAvailable(null);
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/check-slug/${slug}`
    );

    const data = await response.json();

    if (data.success) {
      setSlugAvailable(data.available);
    }
  } catch (err) {
    console.error(err);
  }
};
const uploadImages = async (files) => {
  setUploading(true);

  try {
    const uploads = files.map(async (file) => {
      const formDataObj = new FormData();
      formDataObj.append("image", file);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formDataObj,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.url;
    });

    const uploadedUrls = await Promise.all(uploads);
console.log(uploadedUrls);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));

    toast.success("Images uploaded successfully!");
  } catch (err) {
  console.error(err);

  toast.error(err.message);

  alert(err.message);
} finally {
    setUploading(false);
  }
};
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "name") {
    const generatedSlug = generateSlug(value);

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generatedSlug,
    }));

    checkSlugAvailability(generatedSlug);
    return;
  }

  if (name === "slug") {
    setFormData((prev) => ({
      ...prev,
      slug: value,
    }));

    checkSlugAvailability(value);
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (slugAvailable === false) {
    toast.error("Slug already exists");
    return;
  }
if(Number(formData.price)<=0){

    toast.error("Price should be greater than 0");

    return;

}

if(Number(formData.originalPrice)<Number(formData.price)){

    toast.error("Original price should be greater than price.");

    return;

}

if(Number(formData.stock)<0){

    toast.error("Stock can't be negative.");

    return;

}
    const payload = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      price: Number(formData.price),
      original_price: Number(formData.originalPrice),
      stock: Number(formData.stock),
      badge: formData.badge,
      description: formData.description,

      rating: 0,
      reviews: 0,

best_seller:formData.bestSeller,

new_arrival:formData.newArrival,

      images: formData.images,

      features: [],

      specifications: {},

      related_products: [],
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product Added Successfully!");

setFormData({
  name: "",
  slug: "",
  category: "",
  price: "",
  originalPrice: "",
  stock: "",
  badge: "",
  description: "",
  bestSeller: false,
  newArrival: true,
  images: [],
});

setSlugAvailable(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl rounded-2xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
<input
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Product Name"
  required
  className="w-full rounded-lg border p-3"
/>
<p className="mt-2 text-sm text-gray-500">
  URL:
  <span className="ml-2 text-[#C8A45C] font-medium">
    /product/{formData.slug}
  </span>
</p>
<input
  name="slug"
  value={formData.slug}
  onChange={handleChange}
  placeholder="Slug"
  required
  className="w-full rounded-lg border p-3"
/>
{slugAvailable === true && (
  <p className="mt-2 text-sm text-green-600">
    ✅ Slug is available
  </p>
)}

{slugAvailable === false && (
  <p className="mt-2 text-sm text-red-600">
    ❌ Slug already exists
  </p>
)}
<select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  className="w-full rounded-lg border p-3"
>
  <option value="">Select Category</option>

  <option value="Rings">Rings</option>

  <option value="Bracelets">Bracelets</option>

  <option value="Pendants">Pendants</option>

  <option value="Earrings">Earrings</option>

  <option value="Necklaces">Necklaces</option>

  <option value="Watches">Watches</option>
</select>

        <div className="grid grid-cols-3 gap-4">
<input
  type="number"
  min="1"
  name="price"
  value={formData.price}
  onChange={handleChange}
  placeholder="Price"
  required
  className="rounded-lg border p-3"
/>

<input
  type="number"
  min="1"
  name="originalPrice"
  value={formData.originalPrice}
  onChange={handleChange}
  placeholder="Original Price"
  required
  className="rounded-lg border p-3"
/>

<input
  type="number"
  min="0"
  name="stock"
  value={formData.stock}
  onChange={handleChange}
  placeholder="Stock"
  required
  className="rounded-lg border p-3"
/>
        </div>

<select
  name="badge"
  value={formData.badge}
  onChange={handleChange}
  required
  className="w-full rounded-lg border p-3"
>
  <option value="">Select Badge</option>

  <option value="NEW">NEW</option>

  <option value="BEST">BEST</option>

  <option value="SALE">SALE</option>

  <option value="">None</option>

</select>
<div>

    <label className="mb-3 block text-lg font-semibold">
        Product Images
    </label>

    <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:border-[#C8A45C] hover:bg-yellow-50"
    >

        <FaCloudUploadAlt
            size={55}
            className="mb-4 text-[#C8A45C]"
        />

        <p className="text-lg font-semibold">

            Click or Drag Images Here

        </p>

        <p className="mt-2 text-sm text-gray-500">

            PNG, JPG, JPEG

        </p>

        <input
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={(e)=>uploadImages([...e.target.files])}
        />

    </label>

    {uploading && (

        <div className="mt-4">

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                <div className="h-full w-full animate-pulse bg-[#C8A45C]" />

            </div>

            <p className="mt-2 text-sm text-gray-600">

                Uploading images...

            </p>

        </div>

    )}

</div>
<div className="mt-8 flex flex-wrap gap-5">
  {formData.images.map((image, index) => (
    <div
      key={index}
      className="relative"
    >
      <img
        src={image}
        alt={`Product ${index + 1}`}
        className="h-32 w-32 rounded-2xl border object-cover shadow"
      />

      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
          }))
        }
        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
      >
        <FaTrash size={12} />
      </button>
    </div>
  ))}
</div>
<textarea
  rows={5}
  name="description"
  value={formData.description}
  onChange={handleChange}
  placeholder="Description"
  required
  className="w-full rounded-lg border p-3"
/>

<div className="flex items-center justify-between rounded-lg border p-4">

    <label className="font-medium">
        Best Seller
    </label>

    <input
        type="checkbox"
        checked={formData.bestSeller}
        onChange={(e)=>
            setFormData(prev=>({
                ...prev,
                bestSeller:e.target.checked
            }))
        }
    />

</div>
<div className="flex items-center justify-between rounded-lg border p-4">

    <label className="font-medium">
        New Arrival
    </label>

    <input
        type="checkbox"
        checked={formData.newArrival}
        onChange={(e)=>
            setFormData(prev=>({
                ...prev,
                newArrival:e.target.checked
            }))
        }
    />

</div>


        <button
          className="rounded-full bg-[#C8A45C] px-8 py-3 font-semibold text-white"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}