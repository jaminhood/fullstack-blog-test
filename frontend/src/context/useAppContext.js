import { useContext } from "react"
import { AppContext } from "./AppContext"

const useAppContext = () => {
  const AllAppContext = useContext(AppContext)
  if (AllAppContext === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }

  return AllAppContext
}
export default useAppContext
