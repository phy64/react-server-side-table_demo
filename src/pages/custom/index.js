import React, { Component } from 'react';
import ReactServerSideTable from 'react-server-side-table';
import Input from '../../components/input';

class Custom extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.state = {
      reset: 0,
      tableReset: 0,
      reRenderApiRequest: {
        enabled: false
      },
      ordering: false,
      lengthChange: true,
      searching: true,
      paging: true,
      pageInfo: true,
      currentPage: 1,
      perPage: 5,
      order: {column: 'id', direction: 'asc'},
      addQueryParameters: {
        name: ''
      },
      checkboxCheckedValues: [],
      checkbox: false,
      radio: false,
      children: true,
      formatter: true,
      rowspanColspan: false,
      defaultStyle: true,
      wrapperClass: false,
      tableClass: false,
      pagingFirstLastBtn: true,
      pagingPrevNextBtn: true,
      pagingDisplayLength: 10,
      sortId: false,
      sortName: false,
      sortTel: false,
      sortEmail: false,
      sortRegDate: false,
      language: 'default'
    };
  };
  
  handleChangeName = (value) => {
    this.name = value;
  };
  
  handleSearch = () => {
    const addQueryParameters = {
      name: this.name
    };
    
    this.setState({
      addQueryParameters,
      reRenderApiRequest: {
        enabled: true
      }
    }, () => {
      this.setState({
        reRenderApiRequest: {
          enabled: false
        }
      });
    });
  };

  handleCheckboxCheckedCallback = (values) => {
    if (this.state.checkbox) {
      console.log(`checkbox checked values ${values}`);
    };
  };

  handleRadioCheckedCallback = (value) => {
    if (this.state.radio) {
      console.log(`radio checked value ${value}`);
    };
  };

  handleChangeSwitch = (event) => { 
    const { name, value, checked } = event.target;
    
    this.setState(prevState => ({
      tableReset: prevState.tableReset + Number(value),
      [name]: checked,
      reRenderApiRequest: {
        enabled: true
      }
    }), () => {
      this.setState({
        reRenderApiRequest: {
          enabled: false
        }
      });
    });
  };

  handleChangeRadio = (event) => {
    const { name, value } = event.target;
    const resetNumber = (name === 'pagingDisplayLength' || name === 'language') ? 1 : 0;

    this.setState(prevState => ({
      tableReset: prevState.tableReset + resetNumber,
      [name]: isNaN(value) ? name === 'order' ? JSON.parse(value) : value : Number(value),
      reRenderApiRequest: {
        enabled: true
      }
    }), () => {
      this.setState({
        reRenderApiRequest: {
          enabled: false
        }
      });
    });
  };

  render() {
    const { 
      reset,
      tableReset, 
      reRenderApiRequest, 
      ordering, 
      lengthChange, 
      searching, 
      paging, 
      pageInfo, 
      currentPage, 
      perPage, 
      order, 
      addQueryParameters, 
      checkbox,
      radio,
      children,
      formatter,
      rowspanColspan,
      defaultStyle,
      wrapperClass,
      tableClass,
      pagingFirstLastBtn,
      pagingPrevNextBtn,
      pagingDisplayLength,
      sortId,
      sortName,
      sortTel,
      sortEmail,
      sortRegDate,
      language
    } = this.state;

    const url = 'https://mock-up-data.herokuapp.com/api/users';
    //const url = 'http://localhost:8081/api/admins';
    const headers = [
      [
		{title: <span><i className="fa fa-picture-o" style={{fontSize: "15px"}}/> 사진</span>},
        {title: <span><i className="fa fa-id-card" style={{fontSize: "15px"}}/> 아이디</span>, column: 'id', sortable: sortId},
        {title: <span><i className="fa fa-user" style={{fontSize: "15px"}}/> 이름</span>, column: 'name', sortable: sortName},
        {title: <span><i className="fa fa-phone" style={{fontSize: "15px"}}/> 연락처</span>, column: 'phone', sortable: sortTel},
        {title: <span><i className="fa fa-envelope" style={{fontSize: "14px"}}/> 이메일</span>, column: 'email', sortable: sortEmail}
      ]
    ];

    const noRow = {title: 'No.'};
    const dateRow = {title: <span><i className="fa fa-calendar" style={{fontSize: "14px"}}/> 등록일</span>, column: 'reg_date', sortable: sortRegDate};

    if (rowspanColspan) {//fa fa-calendar
      noRow.rowSpan = 2;
      dateRow.rowSpan = 2;
      headers.unshift([
        noRow,
        {title: '사용자 정보', colSpan: 5},
        dateRow
      ]);
    } else {
      headers[0].unshift(noRow);
      headers[0].push(dateRow);
    }

    const columns = [
      {
        name: 'seq',
        formatter: ({ dataIndex, total, from }) => {
          const rowNumber = total - (from - 1) - dataIndex;
          const addClass = rowNumber % 2 ? 'teal' : 'pink';

          return formatter ? <span className={`ui label ${addClass}`}>{ rowNumber }</span> : rowNumber;
        }
      },
	  {
        name: 'avatar',
		formatter: ({ rowData }) => {
          return <img src={ rowData.avatar } className="img-avatar" alt=' '/>
        }
      }, 
      {
        name: 'id'
      }, 
      {
        name: 'name'
      }, 
      {
        name: 'phone'
      }, 
      {
        name: 'email'
      }, 
      {
        name: 'reg_date',
		formatter: ({ rowData }) => {
          return rowData.reg_date.split("T")[0];
        }
      }
    ];

    let colGroup = ['7%', '8%', '15%', '15%', '15%', '25%', '15%'];

    if (radio) {
      headers[0].unshift({
        title: '', 
        rowSpan: rowspanColspan ? 2 : 1
      });
      columns.unshift({
        name: 'name',
        radio: true
      });
    
      colGroup = ['5%', '7%', '8%', '14%', '14%', '14%', '24%', '14%'];
    };

    if (checkbox) {
      headers[0].unshift({
        title: '', 
        checkboxAll: true, 
        column: 'id',
        rowSpan: rowspanColspan ? 2 : 1
      });
      columns.unshift({
        name: 'id',
        checkbox: true
      });
      
      colGroup = ['5%', '7%', '8%', '14%', '14%', '14%', '24%', '14%'];
    };

    if (radio && checkbox) {
      colGroup = ['5%', '5%', '7%', '8%', '13%', '13%', '13%', '23%', '13%'];
    };

    const settings = {
      defaultStyle: defaultStyle,
      wrapperClass: wrapperClass ? 'wrapper-class-test' : '',
      tableClass: tableClass ? 'table-class-test' : '',
      perPageValues: [5, 10, 20, 30, 100],
      pagingDisplayLength: pagingDisplayLength,
      pagingFirstLastBtn: pagingFirstLastBtn,
      pagingPrevNextBtn: pagingPrevNextBtn,
      colGroup: colGroup,
      queryParameterNames: {
        query: 'id'
      }
    };

    if (language === 'custom') {
      settings.language = {
        lengthMenu: {
          show: '표시개수',
          entries: '개'
        },
        pageInfo: {
          formatter: ({ total, from, to }) => {
            // 넘버링 맞추기
            //return `전체 ${total}개 항목 중 ${total - (from - 1)} ~ ${total - (to - 1)} 항목 보기`
            // data index + 1 순서
            return paging ? `전체 ${total}개 항목 중 ${from} ~ ${to} 항목 보기` : `${total}개 항목`;
          }
        },
        pagination: {
          first: '처음',
          prev: '이전',
          next: '다음',
          last: '마지막'
        },
        search: '검색',
        empty : '검색된 결과가 없습니다.'
      };
    };
    
    return (
      <>
        <div className="mb-5">
          <div className="form-row form-group">
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="paging"
                  value="1"
                  checked={paging} 
                  onChange={this.handleChangeSwitch}
                />
                <span className="custom-control-label">paging</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="pagingFirstLastBtn"
                  value="1"
                  checked={pagingFirstLastBtn} 
                  onChange={this.handleChangeSwitch} 
                  disabled={!paging}
                />
                <span className="custom-control-label">pagingFirstLastBtn</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="pagingPrevNextBtn"
                  value="1"
                  checked={pagingPrevNextBtn} 
                  onChange={this.handleChangeSwitch} 
                  disabled={!paging}
                />
                <span className="custom-control-label">pagingPrevNextBtn</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="lengthChange" 
                  value="0"
                  checked={lengthChange} 
                  onChange={this.handleChangeSwitch} 
                  disabled={!paging}
                />
                <span className="custom-control-label">lengthChange</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="pageInfo"
                  value="0"
                  checked={pageInfo} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">pageInfo</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input"
                  name="searching" 
                  value="0"
                  checked={searching} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">searching</span>
              </label>
            </div>
          </div>
          <div className="form-row form-group">      
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="ordering"
                  value="0"
                  checked={ordering} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">ordering</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input"
                  name="checkbox"
                  value="1" 
                  checked={checkbox} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">checkbox</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input"
                  name="radio"
                  value="1"
                  checked={radio} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">radio</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input"
                  name="defaultStyle"
                  value="1"
                  checked={defaultStyle} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">defaultStyle</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input"
                  name="wrapperClass"
                  value="1"
                  checked={wrapperClass} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">wrapperClass</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input"
                  name="tableClass"
                  value="1"
                  checked={tableClass} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">tableClass</span>
              </label>
            </div>
          </div>
          <div className="form-row form-group">      
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="children"
                  value="0"
                  checked={children} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">children</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="formatter"
                  value="1"
                  checked={formatter} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">formatter</span>
              </label>
            </div>
            <div className="col-2">
              <label className="custom-control custom-switch custom-control-inline">
                <input 
                  type="checkbox" 
                  className="custom-control-input" 
                  name="rowspanColspan"
                  value="1"
                  checked={rowspanColspan} 
                  onChange={this.handleChangeSwitch} 
                />
                <span className="custom-control-label">rowspan / colspan</span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <div className="form-row form-group">
            <div className="col-2">order</div>
            <div className="col-4">
              <div className="custom-control custom-radio custom-control-inline"> 
                <label>
                  <input 
                    type="radio" 
                    className="custom-control-input" 
                    name="order" 
                    value={`{"column": "", "direction": ""}`} 
                    checked={order.column === ''} 
                    onChange={this.handleChangeRadio}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">None</span>
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="radio" 
                    className="custom-control-input" 
                    name="order" 
                    value={`{"column": "id", "direction": "asc"}`} 
                    checked={order.column === 'id'} 
                    onChange={this.handleChangeRadio}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">아이디 / asc</span>
                </label>
              </div>
            </div>
            <div className="col-2">sortable</div>
            <div className="col-4">
              <div className="custom-control custom-checkbox custom-control-inline">
                <label>
                  <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="sortId" 
                    value="1"
                    checked={sortId} 
                    onChange={this.handleChangeSwitch}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">아이디</span>
                </label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <label>
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="sortName" 
                    value="1"
                    checked={sortName} 
                    onChange={this.handleChangeSwitch}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">이름</span>
                </label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <label>
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="sortTel" 
                    value="1"
                    checked={sortTel} 
                    onChange={this.handleChangeSwitch}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">연락처</span>
                </label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <label>
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="sortEmail" 
                    value="1"
                    checked={sortEmail} 
                    onChange={this.handleChangeSwitch}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">이메일</span>
                </label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <label>
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="sortRegDate" 
                    value="1"
                    checked={sortRegDate} 
                    onChange={this.handleChangeSwitch}
                    disabled={!ordering}
                  />
                  <span className="custom-control-label">등록일</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-row form-group">
            <div className="col-2">currentPage</div>
            <div className="col-4">
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="radio" 
                    className="custom-control-input" 
                    name="currentPage" 
                    value="1" 
                    checked={currentPage === 1} 
                    onChange={this.handleChangeRadio} 
                    disabled={!paging}
                  />
                  <span className="custom-control-label">1 페이지</span>
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="radio" 
                    className="custom-control-input" 
                    name="currentPage" 
                    value="2" 
                    checked={currentPage === 2} 
                    onChange={this.handleChangeRadio} 
                    disabled={!paging}
                  />
                  <span className="custom-control-label">2 페이지</span>
                </label>
              </div>
            </div>
            <div className="col-2">perPage</div>
            <div className="col-4">
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="radio" 
                    className="custom-control-input" 
                    name="perPage" 
                    value="5" 
                    checked={perPage === 5} 
                    onChange={this.handleChangeRadio}
                    disabled={!paging}
                  />
                  <span className="custom-control-label">5개</span>
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="radio" 
                    className="custom-control-input" 
                    name="perPage" 
                    value="10" 
                    checked={perPage === 10} 
                    onChange={this.handleChangeRadio}
                    disabled={!paging}
                  />
                  <span className="custom-control-label">10개</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-row form-group">
            <div className="col-2">pagingDisplayLength</div>
            <div className="col-4">
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="pagingDisplayLength" 
                    value="1" 
                    checked={pagingDisplayLength === 1} 
                    onChange={this.handleChangeRadio} 
                    disabled={!paging} 
                  />
                  <span className="custom-control-label">1개</span>
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                  <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="pagingDisplayLength" 
                    value="10" 
                    checked={pagingDisplayLength === 10} 
                    onChange={this.handleChangeRadio} 
                    disabled={!paging} 
                  />
                  <span className="custom-control-label">10개</span>
                </label>
              </div>
            </div>
            <div className="col-2">language</div>
            <div className="col-4">
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="language" 
                    value="default" 
                    checked={language === 'default'} 
                    onChange={this.handleChangeRadio} 
                    disabled={!paging && !searching && !pageInfo}
                  />
                  <span className="custom-control-label">Default</span>
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <label>
                <input 
                    type="checkbox" 
                    className="custom-control-input"
                    name="language" 
                    value="custom" 
                    checked={language === 'custom'} 
                    onChange={this.handleChangeRadio}
                    disabled={!paging && !searching && !pageInfo} 
                  />
                  <span className="custom-control-label">Custom</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-row form-group align-items-center">
            <div className="col-2">addQueryParameters</div>
            <div className="col-4">
              <div style={{display: "inline-block", verticalAlign: "middle"}}>
                <Input
                  key={'name' + reset}
                  type="text"
                  placeholder="이름"
                  onChange={this.handleChangeName}
                  className="form-control"
                />
              </div>
              <button className="btn btn-outline-primary ml-2" onClick={this.handleSearch}>Search</button>
            </div>
            <div className="col-6">
              * Check console log for checkbox and radio callbacks *
            </div>
          </div>
        </div>
        <ReactServerSideTable 
          key={'DataTable' + tableReset}
          url={url} 
          headers={headers} 
          columns={columns} 
          settings={settings}
          reRenderApiRequest={reRenderApiRequest}
          ordering={ordering}
          lengthChange={lengthChange}
          searching={searching}
          addQueryParameters={addQueryParameters}
          currentPage={currentPage}
          paging={paging}
          perPage={perPage}
          pageInfo={pageInfo}
          order={order}
          checkboxCheckedCallback={this.handleCheckboxCheckedCallback}
          radioCheckedCallback={this.handleRadioCheckedCallback}
        >
          { 
            children ? (
              <>
                <button className="btn btn-primary" style={{marginTop: '1.5px', marginLeft: '10px'}}>children1</button>
                <button className="btn btn-secondary" style={{marginTop: '1.5px', marginLeft: '10px'}}>children2</button>
                <button className="btn btn-success" style={{marginTop: '1.5px', marginLeft: '10px'}}>children3</button>
                <button className="btn btn-danger" style={{marginTop: '1.5px', marginLeft: '10px'}}>children4</button>
                <button className="btn btn-warning" style={{marginTop: '1.5px', marginLeft: '10px'}}>children5</button>
              </>
            ) : (
              null
            )
          }
        </ReactServerSideTable>
      </>
    );
  }
};

export default Custom;
