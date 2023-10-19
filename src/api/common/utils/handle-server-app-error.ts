import { Dispatch } from 'redux'
import { BaseResponseType } from '../../../types/common.types'
import { appActions } from '../../../module/app/appSlice'

export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  showError: boolean = true
): void => {
  if (showError) {
    dispatch(
      appActions.setAppError({
        error: data.messages.length ? data.messages[0] : 'Some error occurred',
      })
    )
  }
}
