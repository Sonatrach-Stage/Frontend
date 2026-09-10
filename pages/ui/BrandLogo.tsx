type BrandLogoProps = {
  inverse?: boolean
}

export function BrandLogo({ inverse = false }: BrandLogoProps) {
  return (
    <div className="flex items-center">
      <img
        src="/assets/logo.png"
        alt="StageLink"
        className="h-12 w-12 rounded-full object-cover"
      />
    </div>
  )
}