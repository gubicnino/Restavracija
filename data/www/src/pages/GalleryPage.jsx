import PageTitle from "../components/common/PageTitle";
import GalleryGrid from "../components/gallery/GalleryGrid";
export default function GalleryPage() {
  const galleryImages = [{
    src: '/assets/jackandjoe1.jpg',
    alt: 'Krušna peč',
    category: 'interior'
  }, {
    src: '/assets/jackandjoe2.jpg',
    alt: 'Two people working in the kitchen',
    category: 'interior'
  }, {
    src: '/assets/jackandjoe3.jpg',
    alt: 'Premium slice of meat',
    category: 'food'
  }, {
    src: '/assets/jackandjoe4.jpg',
    alt: 'Person grilling steaks',
    category: 'interior'
  }, {
    src: '/assets/jackandjoe5.jpg',
    alt: 'A big burger',
    category: 'food'
  }, {
    src: '/assets/jackandjoe6.jpg',
    alt: 'A person preparing a pizza',
    category: 'food'
  }, {
    src: '/assets/jackandjoe7.jpg',
    alt: 'A meal being served',
    category: 'food'
  }, {
    src: '/assets/jackandjoe8.jpg',
    alt: 'A hamburger ready to be eaten',
    category: 'food'
  }, {
    src: '/assets/fotojj-p-08.jpg',
    alt: 'Jack & Joe pizza',
    category: 'food'
  }, {
    src: '/assets/fotojj-p-126.jpg',
    alt: 'Jack & Joe interior',
    category: 'interior'
  }, {
    src: '/assets/fotojj-p-48.jpg',
    alt: 'Jack & Joe dining',
    category: 'interior'
  }, {
    src: '/assets/fotojj-p-94.jpg',
    alt: 'Jack & Joe dish',
    category: 'food'
  }, {
    src: '/assets/lenti.jpg',
    alt: 'Jack & Joe Lent lokacija',
    category: 'interior'
  }, {
    src: '/assets/limbus.jpg',
    alt: 'Jack & Joe Limbuš lokacija',
    category: 'interior'
  }, {
    src: '/assets/naslovna2-fotojj-l-big-02.jpg',
    alt: 'Jack & Joe grill',
    category: 'food'
  }, {
    src: '/assets/naslovna6-fotojj-l-big-19.jpg',
    alt: 'Jack & Joe ambiance',
    category: 'interior'
  }, {
    src: '/assets/onas-fotojj-p-98.jpg',
    alt: 'Jack & Joe team',
    category: 'interior'
  }];
  return (
    <>
      <PageTitle
          PageTitle="Galerija"
          title="Oglejte si naše"
          titleGold="fotografije"
          backgroundImage="/assets/jackandjoe6.jpg"
        />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <GalleryGrid images={galleryImages} />
      </div>
    </>
  );
}