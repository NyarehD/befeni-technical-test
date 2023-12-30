import { Rating } from "@smastrom/react-rating";

export default function StarRating({ ironing, comfort }: { ironing?: number, comfort?: number }) {
  return (
    <>
      <div className="flex justify-between">
        <h1 className='text-lg'>Ironing</h1>
        <div className="max-w-44">
          <Rating value={ironing || 0} style={{ maxWidth: 300 }} readOnly />
        </div>
      </div>
      <div className="flex justify-between">
        <h1 className='text-lg'>Comfort</h1>
        <div className="max-w-44">
          <Rating value={comfort || 0} readOnly />
        </div>
      </div>
    </>
  )
}
