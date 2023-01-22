import { FC, useEffect, useState } from 'react'
import { Image } from 'react-konva'

interface ILocalImageProps {
  src: string
  x?: number
  y?: number
  width?: number
  height?: number
}

export const LocalImage: FC<ILocalImageProps> = ({ src, x, y, width, height }) => {
  const [image, setImage] = useState<HTMLImageElement>()

  useEffect(() => {
    const _image = new window.Image()
    _image.src = src

    setImage(_image)
  }, [src])

  return <Image width={width} height={height} x={x} y={y} image={image} />
}
