import React from "react";
import { Media } from "react-bootstrap";

const IssueList = ({ itemList }) => {
  return (
    <div>
      {itemList.map((item) => {
        return (
          <Media className="MediaStyle ">
            <img
              width={64}
              height={64}
              className="mr-3"
              src={item.user.avatar_url}
              alt="Generic placeholder"
            />
            <Media.Body>
              <h5>{item.title}</h5>
              <p>{item.body}</p>
            </Media.Body>
          </Media>
        );
      })}
    </div>
  );
};
export default IssueList;
