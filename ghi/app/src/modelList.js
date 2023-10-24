import { useEffect, useState } from "react";
function ModelsList() {
  const [models, setModels] = useState([]);
  async function fetchData() {
      const response = await fetch("http://localhost:8100/api/models/");
      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
      } else {
        console.error(response);
      }
  }
  useEffect(() => {
      fetchData();
  }, []);
    return (
      <div><h2>Models List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models?.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td><img src={model.picture_url} width={250} height={150} ></img></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }
  export default ModelsList;
