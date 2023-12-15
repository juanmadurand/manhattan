import Head from 'next/head';
import LiveMap from '@/components/LiveMap';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Manhattan</title>
      </Head>
      <div className="main flex">
        <div className="main_body">
          <LiveMap />
        </div>
      </div>
    </div>
  );
}
