/**
 * Utility class for unit conversions.
 */
export class UnitUtils {
  /**
   * Converts a given number of bytes into a human-readable format with appropriate units.
   *
   * @param bytes - The number of bytes to convert.
   * @param fractionDigits - The number of decimal places to include in the result. Defaults to 2.
   * @returns An object containing the converted value and its unit.
   * @returns value - The converted value in the appropriate unit.
   * @returns unit - The unit of the converted value, which can be 'Bytes', 'KB', 'MB', 'GB', 'TB', or 'PB'.
   */
  static convertBytesToHumanReadable(
    bytes: number,
    fractionDigits = 2
  ): { value: number; unit: 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' } {
    if (bytes === 0) {
      return { value: 0, unit: 'Bytes' };
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(fractionDigits));
    const unit = sizes[i] as 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
    return { value, unit };
  }

  /**
   * Converts a given number of bytes into a human-readable string format with appropriate units.
   *
   * @see convertBytesToHumanReadable
   * @param bytes - The number of bytes to convert.
   * @param fractionDigits - The number of decimal places to include in the result. Defaults to 2.
   * @returns A string representing the human-readable format of the given bytes.
   *
   */
  static convertBytesToHumanReadableString(bytes: number, fractionDigits = 2): string {
    const { value, unit } = this.convertBytesToHumanReadable(bytes, fractionDigits);
    return `${value} ${unit}`;
  }
}
