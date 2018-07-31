import {typeOf} from './typeOf';


/**
 * Clone an Array, Object, Function
 * @param src
 * @param args
 */
export function clone (src, args) {
  if (typeOf(src, 'function')) {
    return src.bind({}, args);

  } else if (typeOf(args, 'object') || typeOf(args, 'array')) {
    const c = JSON.parse(JSON.stringify(src));

    for (let i in args) {
      c[i] = args[i];
    }

    return c;
  }
}