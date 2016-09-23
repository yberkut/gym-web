/**
 * Created by yberkut on 23.09.16.
 */
//noinspection JSUnresolvedVariable
import ExampleImage from '../../helpers/ExampleImage';

const ImageCell = ({rowIndex, data, columnKey, ...props}) => (
  <ExampleImage
    src={data.getObjectAt(rowIndex)[columnKey]}
  />
);

export default ImageCell;