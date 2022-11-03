import React from "react";
import "./Customerlab.css";
import { lablevalue } from "./Label.js";
import { useState, useEffect } from "react";
import "./box.css";

function Segment(props) {
  const [labeloptions, setlabeloptions] = useState(lablevalue);
  const [selected, setselected] = useState([]);
  const [Unselected, setUnselected] = useState([]);
  const [value, setValue] = useState("");
  const [data, setdata] = useState([]);
  const [saving, setsaving] = useState("");

  const handlesegment = (e) => {
    e.preventDefault();
    setsaving(e.target.value);
  };

  const handleSubmit = () => {
    if (saving.length !== 0 && selected.length !== 0) {
      const selecteddata = selected.map(({ Label, Value }) => ({
        [Label]: Value,
      }));

      const datas = {
        segment_name: saving,
        schema: selecteddata,
      };

      fetch(`https://webhook.site/1a9c3602-b74e-4241-ae9b-09c19c1e6aa3`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(datas),
      });
    } else {
      alert("please enter the segment name");
    }
    alert("Segment has been successfully created");
  };

  const clearState = () => {
    setdata([]);
  };

  var onselect = (e) => {
    setValue(e.target.value);

    e.preventDefault();
    setdata((pre) => [...pre, labeloptions[e.target.selectedIndex - 1]]);
  };
  console.log(labeloptions);
  useEffect(() => {
    if (Unselected.length === 0) {
      setUnselected(labeloptions);
    }
  }, []);

  const addvalues = (e) => {
    if (data.length > 0) {
      setselected((selected) => [...selected, data[0]]);
      var filter = Unselected.filter((e) => e.id !== data[0].id);

      setUnselected(filter);
      setlabeloptions(filter);
      setdata([]);
    } else {
      clearState();
    }
  };

  var selectvalue = (e) => {
    e.preventDefault();
  };

  return (
    <div className="box">
      <div className="inside">
        <h2 className="heading">Saving Segment</h2>
        <div className="textbox">
          <div className="textbox">Enter the Name of the Segment</div>
          <input
            className="textbox"
            placeholder="Name of the Segment"
            required
            value={saving}
            onChange={handlesegment}
          />
          <div className="textboxs">
            To save your segment ,you need to add the schemas to build the query
          </div>
          {/* <div
            style={{
              display: "flex",
              flexdirection: "row",
              justifyContent: "center",
              padding: "2px",
            }}
          >
            <span
              style={{
                display: "flex",
                flexdirection: "row",
                justifyContent: "center",
              }}
            >
              <li style={{ color: "green", fontSize: "20px" }}></li>
              User Traits
            </span>
            <span
              style={{
                marginLeft: "20px",
                display: "flex",
                flexdirection: "row",
                justifyContent: "center",
              }}
            >
              <li style={{ color: "red", fontSize: "20px" }}></li>
              Group Traits
            </span>
          </div> */}
          <div className="dropdown">
            {selected.length > 0 && (
              <div className="blue-box">
                {selected.map((lablevalue, index) => {
                  return (
                    <select
                      onChange={selectvalue}
                      value={lablevalue.Value}
                      id={index}
                    >
                      <option value={lablevalue.Value}>
                        {lablevalue.Label}
                      </option>
                      {Unselected.map((lablevalue, index) => (
                        <option key={index} value={lablevalue.Value}>
                          {lablevalue.Label}
                        </option>
                      ))}
                    </select>
                  );
                })}
              </div>
            )}
            <select className="select" onChange={onselect} value={value}>
              <option value="">Add schema to segment</option>
              {Unselected.map((lablevalue, index) => (
                <option key={index} value={lablevalue.Value}>
                  {lablevalue.Label}
                </option>
              ))}
            </select>

            <button type="submit" onClick={addvalues} className="button">
              + Add new schema
            </button>
          </div>
        </div>
        <div className="footer">
          <button type="submit" onClick={handleSubmit} className="saving">
            save the segment
          </button>

          <button className="cancel" onClick={props.setTrigger}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Segment;
