declare module "clusterize.js" {
  export = Clusterize;
  export as namespace Clusterize;

  /**
   * For examples and more information, visit:
   * https://github.com/NeXTs/Clusterize.js
   */
  class Clusterize {
    constructor(params: ClusterizeParameters);

    /** Updates list with new data */
    update: (datas: string[]) => void;
    /** Appends new data to the list */
    append: (datas: string[]) => void;
    /** Prepends new data to the list */
    prepend: (datas: string[]) => void;
    /**
     * Refreshes row height. Clusterize must always know current row height.
     *
     * It watches for window resize by itself but the width of the container may be changed programmatically, for example by dynamic neighboring elements, which could lead to a change in the height of rows. In such cases, you must call .refresh () to force Clusterize get new row height.
     *
     * Optional parameter (true) may be passed to force update Clusterize's processing, even if row height hasn't been changed.
     */
    refresh: (force?: boolean) => void;
    /**
     * Returns total amount of rows
     */
    getRowsAmount: () => number;
    /**
     * Returns current scroll progress
     */
    getScrollProgress: () => number;
    /**
     * Clears the list
     */
    clear: () => void;
    /**
     * Destroys clusterize instance.
     *
     * @param {boolean} clear if true - removes all data from the list, not specify or false - inserts all hidden data to the list
     */
    destroy: (clear: boolean) => void;
  }

  export type ClusterizeCallbacks = {
    /**
     * Will be called right before replacing previous cluster with new one.
     */
    clusterWillChange: () => void;
    /**
     * Will be called right after replacing previous cluster with new one.
     */
    clusterChanged: () => void;
    /**
     * Will be called on scrolling. Returns progress position.
     */
    scrollingProgress: (progress: number) => void;
  };

  type ClusterizeElements =
    | {
        /**
         * Id of parent tag which used as scroll area.
         * @example scrollId: 'scrollArea'
         */
        scrollId: string;
        /**
         * Id of tag where content will be placed.
         * @example contentId: 'contentArea'
         */
        contentId: string;
      }
    | {
        /**
         * DOM node of parent tag which used as scroll area.
         * @example scrollElem: document.getElementById('scrollArea')
         */
        scrollElem: Element | HTMLElement;
        /**
         * DOM node of tag where content will be placed.
         * @example contentElem: document.getElementById('contentArea')
         */
        contentElem: Element | HTMLElement;
      };

  export type ClusterizeParameters = ClusterizeElements & {
    /**
     * If you render rows by yourself - pass array of tags in String. This way is preferable.
     *
     * If you need to use existing markup - do not specify this option at all.
     *
     * @example ['<tr><td>First</td></tr>', '<tr><td>Second</td></tr>'];
     */
    rows?: string[];
    /**
     * Tag name for supporting elements: spacing extra rows, empty-data row.
     *
     * It will be determined by itself once data provided, so it's optional.
     *
     * But if your data is not provided during initialization - it is better to specify this option because otherwise plugin will be unable to correctly render empty-data row.
     *
     * @example 'tr'. Default: null
     */
    tag?: string | null;
    /**
     * Amount of rows in block.
     *
     * Increase means browser will be more loaded, decrease means browser will have to update clusters more often.
     *
     * This example would help to understand this property easier.
     *
     * Good practice will be to keep rows_in_block as amount of visible rows in your list.
     *
     * Must be even to keep parity.
     *
     * @default Default: 50
     */
    rows_in_block?: number;
    /**
     * Amount of blocks in cluster.
     *
     * When scroll reaches last block - content replaces with next cluster.
     *
     * @default Default: 4
     */
    blocks_in_cluster?: number;
    /**
     * Specifies whether to display an "empty" placeholder row if there is no data provided.
     * @default true
     */
    show_no_data_row?: boolean;
    /**
     * Class for placeholder element if there is no data provided.
     * @default 'clusterize-no-data'
     */
    no_data_class?: string;
    /**
     * Text for placeholder element if there is no data provided.
     * @default 'No data'
     */
    no_data_text?: string;
    /**
     * Add extra tag to keep parity of rows. Useful when used :nth-child(even/odd)
     * @default true
     */
    keep_parity?: boolean;
    callbacks?: ClusterizeCallbacks;
  };
}
