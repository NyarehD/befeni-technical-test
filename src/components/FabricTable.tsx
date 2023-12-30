import { ApiDataProps } from '../types/ApiDataProps'

export default function FabricTable({ data }: { data?: ApiDataProps }) {
  return (
    <table className="min-w-full divide-y-2 bg-secondary/20 text-sm border-secondary border">
      <tbody className="divide-y divide-secondary *:divide-secondary *:divide-x *:p-3 text-lg text-start [&>tr>td]:px-4 [&>tr>td:first-child]:max-w-20 sm:[&>tr>td:first-child]:max-w-24">
        <tr className=''>
          <td>Type:</td>
          <td>{data?.type}</td>
        </tr>
        <tr>
          <td>Material:</td>
          <td>{data?.pattern}</td>
        </tr>
        <tr>
          <td>Webart:</td>
          <td>{data?.default_weave}</td>
        </tr>
        <tr>
          <td>Gewicht:</td>
          <td>{data?.default_weight} g/m2</td>
        </tr>
        <tr>
          <td>Finishing:</td>
          <td>{data?.default_finish}</td>
        </tr>
      </tbody>
    </table>
  )
}
