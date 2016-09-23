/**
 * Created by yberkut on 23.09.16.
 */
//noinspection JSUnresolvedVariable
import {Cell} from 'fixed-data-table';

const LinkCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    <a href="#">{data.getObjectAt(rowIndex)[columnKey]}</a>
  </Cell>
);

export default LinkCell;