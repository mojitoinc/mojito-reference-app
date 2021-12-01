import type { NextPage } from "next";
import Image from "next/image";
import LotGridItem from "components/LotGridItem";
import { useContentfulLots, useAuction, useCollection } from "hooks";
import styles from "styles/Home.module.css";
import Content from 'metaverso.content.json';

const Home: NextPage = () => {
  const { lots } = Content
  const { slug } = useAuction();
  const { collection } = useCollection(slug, {
    pollInterval: 1500, // To discuss
  });

  const collectionLotsIds = collection?.items?.map((e: any) => e.lot.id) || [];
  let filteredLots = lots.filter((e) =>
    collectionLotsIds.includes(e.mojitoId)
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src="/images/brand-icon.png" alt="icon" width={24} height={8} />
        <h1 className={styles.title}>Metaverso NFTs</h1>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>

        <div className={styles.grid}>
        {
          filteredLots.map(lot => {
            const item = collection?.items.find((item: any) => item.lot.id === lot.mojitoId)
            return lot ? (
              <LotGridItem
                key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
                mojitoLotData={item.lot}
                lot={lot}
                auctionSlug={collection.slug}
              />
            ) : null;
          })
        }
          {/* {collection?.items.map((item: any) => {
            const lot = filteredLots.find((lot) => lot.mojitoId === item.lot.id);
            return lot ? (
              <LotGridItem
                key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
                mojitoLotData={item.lot}
                lot={lot}
                auctionSlug={collection.slug}
              />
            ) : null;
          })} */}
          <div className={styles.dummyView} />
          <div className={styles.dummyView} />
        </div>
      </main>
    </div>
  );
};

export default Home;
