export const AllUser = ({ proofDocument }) => {
  return (
    <div className="d-flex justify-content-between align">
      <div className="rounded mr-1 ">
        <a className="bg-dark py-1 px-3 text-light" href="">
          Driving License
        </a>
      </div>
      <div className="rounded mr-1">
        <a className="bg-dark  px-3 text-light" href="">
          Passport Image
        </a>
      </div>
      <div className="rounded ">
        <a className="bg-dark  px-3 text-light" href="">
          Proof Document
        </a>
      </div>
    </div>
  )
}
export default AllUser
