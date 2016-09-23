/**
 * Created by yberkut on 23.09.16.
 */
//noinspection JSUnresolvedVariable
import {Cell} from 'fixed-data-table';

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export default TextCell;