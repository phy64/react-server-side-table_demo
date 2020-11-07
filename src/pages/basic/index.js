import React from 'react';
import ReactServerSideTable from 'react-server-side-table';

const Basic = () => {
  const url = 'https://mock-up-data.herokuapp.com/api/users';
  const headers = [
    [
      {title: "아이디"},
      {title: "이름"},
      {title: "연락처"},
      {title: "이메일"},
      {title: "등록일"}
    ]
  ];
  const columns = [
    {name: 'id'}, 
    {name: 'name'}, 
    {name: 'phone'}, 
    {name: 'email'}, 
    {name: 'reg_date'}
  ];
  const settings = {
    queryParameterNames: {
      search: 'id'
    }
  };

  return (
    <ReactServerSideTable 
      url={url} 
      headers={headers} 
      columns={columns} 
      settings={settings}
    />
  );
};

export default Basic;
