import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

export const cld = new Cloudinary({ 
  cloud: { 
    cloudName: 'dffn2num4'
  } 
});

export const getImage = (publicId, options = {}) => {
  const {
    width = 800,
    height = 600,
    crop = 'fill'
  } = options;

  return cld
    .image(publicId)
    .format('auto') 
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));
};

export const getMenuImage = (publicId) => {
  return cld
    .image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(400).height(400));
};