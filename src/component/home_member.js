import React from "react";

function SingleMember({ onclick, img, f_name, l_name, email, mobile }) {
  return (
    <button className="member_button_style" onClick={onclick}>
      {img != null ? (
        <img
          src={"http://mobileapp.kalyaniaura.com/storage/" + img.split("/")[1]}
          alt="..."
          className="image"
        />
      ) : (
        <center>
          <div className="letter_image">
            {f_name[0].toUpperCase()}
            {l_name[0].toUpperCase()}
          </div>
        </center>
      )}

      <div
        className="member_sub_text"
        style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
      >
        {f_name} {l_name}
      </div>
      <div className="member_sub_text">
        <i className="fas fa-envelope-open member_sub_icon" />
        {email}
      </div>
      <div className="member_sub_text" style={{ fontWeight: 600 }}>
        <i className="fas fa-phone-alt member_sub_icon" />
        {mobile}
      </div>
    </button>
  );
}

export default SingleMember;
