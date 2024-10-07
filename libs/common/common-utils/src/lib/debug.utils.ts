import { UnitUtils } from './unit.utils';

/**
 * Utility class for debugging purposes.
 */
export class DebugUitls {
  /**
   * Dumps the current memory usage of the Node.js process in a human-readable format.
   *
   * @returns An object containing the following properties:
   * - `heapUsed`: The amount of memory used by the heap, formatted as a human-readable string.
   * - `heapTotal`: The total amount of memory available for the heap, formatted as a human-readable string.
   * - `arrayBuffers`: The amount of memory used by array buffers, formatted as a human-readable string.
   * - `external`: The amount of memory used by C++ objects bound to JavaScript objects, formatted as a human-readable string.
   * - `rss`: The Resident Set Size, which is the total memory allocated for the process, formatted as a human-readable string.
   */
  public static getMemoryUsageHumanReadable(): {
    heapUsed: string;
    heapTotal: string;
    arrayBuffers: string;
    external: string;
    rss: string;
  } {
    const { heapUsed, heapTotal, arrayBuffers, external, rss } = process.memoryUsage();
    const heapUsedString = UnitUtils.convertBytesToHumanReadableString(heapUsed);
    const heapTotalString = UnitUtils.convertBytesToHumanReadableString(heapTotal);
    const bufferString = UnitUtils.convertBytesToHumanReadableString(arrayBuffers);
    const externalString = UnitUtils.convertBytesToHumanReadableString(external);
    const rssString = UnitUtils.convertBytesToHumanReadableString(rss);
    return {
      heapUsed: heapUsedString,
      heapTotal: heapTotalString,
      arrayBuffers: bufferString,
      external: externalString,
      rss: rssString,
    };
  }
}
