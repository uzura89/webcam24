import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { MODAL_CONFIG, useModalStore } from "@/store/modalStore";
import { Modal } from "./components/Modal";
import {
  ConfigObjectType,
  selectConfigObject,
  useConfigStore,
} from "@/store/configStore";
import { usePlayerStore } from "@/store/playerStore";

export function ConfigModal() {
  // store state
  const visible = useModalStore((state) => state.visibleModal === MODAL_CONFIG);
  const closeModal = useModalStore((state) => state.closeModal);
  const configObj = useConfigStore(useShallow(selectConfigObject));
  // store functions
  const setIntervalSecNextPlace = useConfigStore(
    (state) => state.setIntervalSecNextPlace
  );
  const setSecondsUntilNext = usePlayerStore(
    (state) => state.setSecondsUntilNext
  );
  // local state
  const [configObjLocal, setConfigObjLocal] = useState(configObj);
  // refs
  const configObjRef = useRef<ConfigObjectType>(configObj);

  /**
   * Functions
   */

  function applyChangeToStore() {
    // update config store
    const validConfigObj = getValidConfigObj(configObjRef.current);
    setIntervalSecNextPlace(validConfigObj.intervalSecNextPlace);
    // update player store
    setSecondsUntilNext(validConfigObj.intervalSecNextPlace);
  }

  /**
   * User Inputs
   */

  function onCloseModal() {
    applyChangeToStore();
    closeModal();
  }

  function onChangeIntervalSec(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setConfigObjLocal({ ...configObjLocal, intervalSecNextPlace: value });
  }

  /**
   * Effects
   */

  useEffect(() => {
    configObjRef.current = configObjLocal;
  }, [configObjLocal]);

  /**
   * Render
   */

  return (
    <Modal
      visible={visible}
      width="280px"
      closeModal={onCloseModal}
      title="Config"
    >
      <div className="p-5">
        {/* Seconds */}
        <div className="flex items-center justify-between">
          <div className="text-sm">Interval Seconds:</div>
          <input
            type="number"
            className="w-[5rem] rounded-md px-2 py-1 form"
            value={configObjLocal.intervalSecNextPlace}
            onChange={onChangeIntervalSec}
          />
        </div>
      </div>
    </Modal>
  );
}

/**
 * Helper functions
 */

function getValidConfigObj(configObject: ConfigObjectType): ConfigObjectType {
  let validConfigObject = { ...configObject };

  // update intervalSecNextPlace
  validConfigObject.intervalSecNextPlace =
    validConfigObject.intervalSecNextPlace > 0
      ? validConfigObject.intervalSecNextPlace
      : 10;

  return validConfigObject;
}
