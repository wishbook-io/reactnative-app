import { LayoutProvider } from 'recyclerlistview';
import { Dimensions } from 'react-native';

export class LayoutUtil {
  static getWindowWidth(adjust) {
    // To deal with precision issues on android
    return Math.round(Dimensions.get('window').width * 1000) / 1000 - adjust; //Adjustment for margin given to RLV;
  }
  static getLayoutProvider(type, adjust) {
    switch (type) {
      case 0:
        return new LayoutProvider(
          () => {
            return 'VSEL'; //Since we have just one view type
          },
          (type, dim, index) => {
            const columnWidth = LayoutUtil.getWindowWidth(adjust) / 3;
            switch (type) {
              case 'VSEL':
                if (index % 3 === 0) {
                  dim.width = 3 * columnWidth;
                  dim.height = 300;
                } else if (index % 2 === 0) {
                  dim.width = 2 * columnWidth;
                  dim.height = 250;
                } else {
                  dim.width = columnWidth;
                  dim.height = 250;
                }
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      case 1:
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust) / 2;
                dim.height = 250;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      case 2:
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust);
                dim.height = 200;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      case 3://order item list lead items
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust);
                dim.height = 90;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      case 4://order item
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust);
                dim.height = 300;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      case 5://order item enquiry
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust);
                dim.height = 150;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      case 6:
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust) / 3;
                dim.height = 250;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
      default:
        return new LayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = LayoutUtil.getWindowWidth(adjust);
                dim.height = 300;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
    }
  }
}
