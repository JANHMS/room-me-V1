import rommmeimage from'../images/roomme.png';

const HeaderImage = () => { 
  return(
    <div style={{
      textAlign: "center",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "100px"}}>
      <img src={rommmeimage} />
    </div>
  )
}

export default HeaderImage;
