import React, { useState, useRef } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import { Button, Box } from '../../ui-kit';
import { useUploadProfileImage } from '../../hooks';
import { GET_CURRENT_USER } from '../../hooks/useCurrentUser';

import Styled from './Profile.styles';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageUploader(props) {
  const [status, setStatus] = useState('IDLE');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef('');
  const [uploadProfileImage] = useUploadProfileImage();

  const [completedCrop, setCompletedCrop] = useState();

  const [aspect, setAspect] = useState(1);

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      props.setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onSetCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }

    previewCanvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }

      try {
        setStatus('LOADING');
        const size = Math.round(blob.size / 1024); // Size in KB
        const { data } = await uploadProfileImage({
          variables: {
            file: blob,
            size: size,
          },
        });
        // Access the uploaded photo URI from the response data
        const photoURI = data.uploadProfileImage.photo.uri;
        props.handleCloseImageUploader();
        console.log('Uploaded photo URI:', photoURI);
      } catch (error) {
        console.error('Failed to upload profile image:', error);
      } finally {
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
        }
      }
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  const isLoading = status === 'LOADING';

  return (
    <div className="ImageUploader">
      {!!props.imgSrc ? (
        <Box mb="base">
          <Styled.Title mb="xs">Crop your new profile picture</Styled.Title>
          <ReactCrop
            crop={props.crop}
            onChange={(_, percentCrop) => props.setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={props.imgSrc}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </Box>
      ) : null}
      {!!completedCrop ? (
        <>
          <Box display="none">
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </Box>
          <Box justifyContent="center" display="flex">
            <Button
              size="small"
              onClick={onSetCropClick}
              title={isLoading ? 'Saving...' : 'Set New Profile Image'}
            />
          </Box>
        </>
      ) : null}
    </div>
  );
}
