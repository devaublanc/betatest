import React, { useEffect } from "react";
export function List({ type }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {data.map(o => {
        console.log(o);
        return <div>{o[type]}</div>;
      })}
    </div>
  );
}
