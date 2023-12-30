import { useEffect, useMemo, useRef } from 'react';
import './App.css';
// import * as Befeni from "./library/befeni-library/befeni-fabric-api-wrapper.esm.js"
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChevornIcon from './assets/ChevornIcon.js';
import FabricCarousel from './components/Carousel.js';
import DesignInspiration from './components/DesignInspiration.js';
import FabricTable from './components/FabricTable.js';
import StarRating from './components/StarRating.js';
import ClientBase from './library/befeni-library/befeni-fabric-api-wrapper.js';
import { ApiDataProps } from './types/ApiDataProps.js';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU5YWQ3Yjc0YmMyODIxN2JiYWFjZDExOGMyZWJjOWQwNDA1YTRhYTM2YzkzMTQ3MjIzZWNkZjBhMjNhNjZlZmY4MWU1YTZmMWMxZTc0NzIyIn0.eyJhdWQiOiIxIiwianRpIjoiNTlhZDdiNzRiYzI4MjE3YmJhYWNkMTE4YzJlYmM5ZDA0MDVhNGFhMzZjOTMxNDcyMjNlY2RmMGEyM2E2NmVmZjgxZTVhNmYxYzFlNzQ3MjIiLCJpYXQiOjE3MDIyNzE3ODIsIm5iZiI6MTcwMjI3MTc4MiwiZXhwIjoxNzMzODk0MTgyLCJzdWIiOiIxNTkxNzUiLCJzY29wZXMiOlsiYnV0dG9uX2NvbG9yX2xpc3RfaXRlbXMiLCJmYWJyaWNfbGlzdF9pdGVtcyIsImZhYnJpY19jb21wb3NpdGlvbl9saXN0X2l0ZW1zIiwiZmFicmljX2ZhbWlseV9saXN0X2l0ZW1zIiwic2hpcnRfZ2FsbGVyeV9saXN0X2l0ZW1zIiwic2hpcnRfZ2FsbGVyeV91cGRhdGVfcHJlZmVyZW5jZSIsInRocmVhZF9jb2xvcl9saXN0X2l0ZW1zIiwiZmFicmljX2Jvb2tfbGlzdF9pdGVtcyIsImZhYnJpY19ib29rX2dldF9pdGVtIiwiZmFicmljX2Jvb2tfY3JlYXRlX2l0ZW0iLCJmYWJyaWNfYm9va191cGRhdGVfaXRlbSIsImZhYnJpY19ib29rX2RlbGV0ZV9pdGVtIiwiZmFicmljX2Jvb2tfdXBkYXRlX3ByZWZlcmVuY2UiLCJmYWJyaWNfYm9va19jYXRlZ29yeV9saXN0X2l0ZW1zIiwiZmFicmljX2Jvb2tfY2F0ZWdvcnlfZ2V0X2l0ZW0iLCJmYWJyaWNfYm9va19jYXRlZ29yeV9jcmVhdGVfaXRlbSIsImZhYnJpY19ib29rX2NhdGVnb3J5X3VwZGF0ZV9pdGVtIiwiZmFicmljX2Jvb2tfY2F0ZWdvcnlfZGVsZXRlX2l0ZW0iXX0.XLNni31PW9E5cb7UY3sjTd7dwQpg1bF6cwBGe5f-vGHH5-KGRaid4o7DfgUiIJkms0KkS2K5R4az7W0mCZ2BQwu2tP_gej2ouUb3QMW76APgRs6REjTvfRHto9dbXn-cgFVEfzIpnH9hn60b1BFZbc854_tRou-tZW0rEd3Xz7kBsmOOE756EbsIzLbkD3qLNs70VswVY37RCJ408bEFPAS3iuYpc3v82mgQMhPrSVozo3hi9XiW8NK5IwG-QBD64qn1IdFf95nHSfZL28Sag-ovMgH02ix_d5YhuywhtT5nBDdmVmbTX_dQWa_QVEILu9nNpeMAovjw_SzsAmv-RuMh44UmvIxS52aoNZxaBbe4Y0I6vbCDlk0c_poCRE3YZsTxUFG1rIHWPDbgWT1Usc8fMVMblXPuTDnlQUamNqEuWdvPd0gcPNPnNKKW8UkRDjk8zo5eq8kkAkHSXfIkSvy1MRevomHKG-qKJKOjo2RWT3iG630vr6nkF1QLJoV5By_zvIUdkWBqKh7390Vg9AFIe-rK2Lwp_jThq6x06A8oGQQRoXGVE7hfIriB4cBQnSSKVrckUpP1vTxPt5Q3FlTs6tIjVY8jpOPA3gi55vbBuG3z-3R-HzkVoNNxSFEVJUe8NepYLf9vjO4fDPJ0jLCH9alJPF9blI5Adb3rtzQ";

const config = {
  shopBaseUrl: '',
  apiBaseUrl: 'https://production.befeni.net/api/v2'
};

const client = new ClientBase(config, 'de');

function App() {
  const params = useParams<{ fabricCode?: string }>()
  const location = useLocation();
  const navigate = useNavigate()

  const designInspiration = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/fabrics/22")
    }
    client.updateAccessTokenDirectly(token);

    return () => {
    }
  }, [])

  // For mapping the user fabric code to factory fabric code
  const currentFactoryFabricCode = useMemo(() => {
    let factoryFabricCode;
    if (params.fabricCode) {
      if (Number.isNaN(Number(params.fabricCode))) {
        const getCodeNumber = Number(params.fabricCode.slice(1));
        switch (params.fabricCode[0]) {
          case "K":
            factoryFabricCode = 30000 + getCodeNumber
            break;
          case "T":
            factoryFabricCode = 20000 + getCodeNumber
            break;
        }
      } else {
        factoryFabricCode = 10000 + Number(params?.fabricCode)
      }
    }
    return factoryFabricCode
  }, [])


  const { data, isLoading } = useQuery<ApiDataProps>({
    queryKey: ["fabric", currentFactoryFabricCode],
    queryFn: async function () {
      return await client.getFabric(currentFactoryFabricCode);
    }
  })

  return (
    <div className='container mx-auto scroll-smooth'>
      {isLoading ? <p className='p-10 italic'>Loading</p> : (
        <div className=''>
          {/* Header */}
          <div className="flex w-full">
            <div className="order-1 flex w-full sm:w-1/2 justify-between sm:justify-start sm:gap-4 md:justify-between">
              <div className="sm:order-2 md:order-1">
                <h1 className='text-2xl'>{data?.name}</h1>
              </div>
              <div className="sm:order-1 md:order-2">
                <h1 className='text-2xl'>{params?.fabricCode}</h1>
              </div>
            </div>
            <div className="order-2 w-1/2 sm:block hidden" onClick={() => designInspiration.current?.scrollIntoView()}>
              <p className='text-xl'>View Design Inspiration</p>
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col sm:flex-row sm:gap-4">
            {/* Carousel */}
            <div className="my-2 w-full sm:w-1/2">
              <FabricCarousel images={data?.fabricImages} />
            </div>
            <div className='w-full sm:w-1/2 mt-4'>
              {/* Data Table */}
              <div className="">
                <FabricTable data={data} />
              </div>
              {/* Rating */}
              <div className="py-4 mt-16 sm:mt-10">
                <StarRating comfort={data?.comfort} ironing={data?.comfort} />
              </div>
            </div>
          </div>
          {/* Design Inspiration */}
          <div className="mt-20 sm:mt-10" ref={designInspiration}>
            <DesignInspiration />
            <div className="w-full flex justify-center sm:hidden">
              <ChevornIcon />
            </div>
          </div>
          {/* View PopOver */}
          <div className="sm:hidden fixed bottom-4 w-[80vw] border-2 border-secondary bg-secondary/40 rounded-2xl p-2 " onClick={() => designInspiration.current?.scrollIntoView()}>
            <p className='text-secondary text-xl'>View Design Inspiration</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
