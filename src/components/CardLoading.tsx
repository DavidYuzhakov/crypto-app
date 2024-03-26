import ContentLoader from "react-content-loader"

export default function CardLoading() {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={325}
      viewBox="0 0 300 325"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="275" rx="7" ry="7" width="300" height="50" />
      <rect x="0" y="0" rx="7" ry="7" width="300" height="250" />
    </ContentLoader>
  )
}
