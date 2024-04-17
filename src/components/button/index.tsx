import Loader from "../loader"

const Button = ({ isLoading, children, variant, ...props}: any) => {
  const getVariant = () => {
    switch(variant){
      case "error":
        return 'btn-error'
      case "success":
        return 'btn-success'
      default:
        return 'bg-backgroundButton'
    }
  }
  return (
    <button
      disabled={isLoading}
      {...props}
      className={`btn ${getVariant()} ${props.className}`}
    >
      {isLoading
        ? <Loader />
        : children
      }
    </button>
  )
}

export default Button