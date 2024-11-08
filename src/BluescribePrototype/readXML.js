
import { BlobReader, TextWriter, ZipReader } from '@zip.js/zip.js';
import { parseXML } from 'bsd-schema';
import fxparser from 'fast-xml-parser';
import _ from 'lodash';
import { parseXML } from './BluescribePrototype/schemas';


/**
 * Reads and parses an XML file, decompressing if needed.
 * @param {string} path - The path to the XML file.
 * @param {object} fs - The file system to use for reading files.
 * @returns {object} - Parsed XML data.
 */
export const readXML = async (path, fs) => {
    let buffer = await fs.promises.readFile(path);
    
    // Check if file is compressed (ends with 'z')
    if (path.endsWith('z')) {
        const blob = new Blob([buffer]);
        const zipFileReader = new BlobReader(blob);
        const zipReader = new ZipReader(zipFileReader);
        const firstEntry = (await zipReader.getEntries()).shift();
        const textWriter = new TextWriter();

        buffer = await firstEntry.getData(textWriter);
        await zipReader.close();
    }

    // Parse XML content
    return parseXML(buffer.toString(), false);
};

// XML Builder setup (if needed for writing XML)
const builder = new fxparser.XMLBuilder({
    attributeNamePrefix: '',
    ignoreAttributes: false,
    format: true,
    indentBy: '  ',
    processEntities: true,
    suppressBooleanAttributes: false,
    suppressUnpairedNode: false,
});
